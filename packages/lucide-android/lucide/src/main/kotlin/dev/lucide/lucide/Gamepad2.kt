package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Gamepad2: ImageVector
    get() {
        if (_gamepad2 != null) {
            return _gamepad2!!
        }
        _gamepad2 = Builder(name = "Gamepad2", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(6.0f, 11.0f)
                lineTo(10.0f, 11.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(8.0f, 9.0f)
                lineTo(8.0f, 13.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.0f, 12.0f)
                lineTo(15.01f, 12.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(18.0f, 10.0f)
                lineTo(18.01f, 10.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(17.32f, 5.0f)
                horizontalLineTo(6.68f)
                arcToRelative(4.0f, 4.0f, 0.0f, false, false, -3.978f, 3.59f)
                curveToRelative(-0.006f, 0.052f, -0.01f, 0.101f, -0.017f, 0.152f)
                curveTo(2.604f, 9.416f, 2.0f, 14.456f, 2.0f, 16.0f)
                arcToRelative(3.0f, 3.0f, 0.0f, false, false, 3.0f, 3.0f)
                curveToRelative(1.0f, 0.0f, 1.5f, -0.5f, 2.0f, -1.0f)
                lineToRelative(1.414f, -1.414f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 9.828f, 16.0f)
                horizontalLineToRelative(4.344f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 1.414f, 0.586f)
                lineTo(17.0f, 18.0f)
                curveToRelative(0.5f, 0.5f, 1.0f, 1.0f, 2.0f, 1.0f)
                arcToRelative(3.0f, 3.0f, 0.0f, false, false, 3.0f, -3.0f)
                curveToRelative(0.0f, -1.545f, -0.604f, -6.584f, -0.685f, -7.258f)
                curveToRelative(-0.007f, -0.05f, -0.011f, -0.1f, -0.017f, -0.151f)
                arcTo(4.0f, 4.0f, 0.0f, false, false, 17.32f, 5.0f)
                close()
            }
        }
        .build()
        return _gamepad2!!
    }

private var _gamepad2: ImageVector? = null
