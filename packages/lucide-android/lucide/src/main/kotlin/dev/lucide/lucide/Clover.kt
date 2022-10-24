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

public val Lucide.Clover: ImageVector
    get() {
        if (_clover != null) {
            return _clover!!
        }
        _clover = Builder(name = "Clover", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(16.2f, 3.8f)
                arcToRelative(2.7f, 2.7f, 0.0f, false, false, -3.81f, 0.0f)
                lineToRelative(-0.4f, 0.38f)
                lineToRelative(-0.4f, -0.4f)
                arcToRelative(2.7f, 2.7f, 0.0f, false, false, -3.82f, 0.0f)
                curveTo(6.73f, 4.85f, 6.67f, 6.64f, 8.0f, 8.0f)
                lineToRelative(4.0f, 4.0f)
                lineToRelative(4.0f, -4.0f)
                curveToRelative(1.33f, -1.36f, 1.27f, -3.15f, 0.2f, -4.2f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(8.0f, 8.0f)
                curveToRelative(-1.36f, -1.33f, -3.15f, -1.27f, -4.2f, -0.2f)
                arcToRelative(2.7f, 2.7f, 0.0f, false, false, 0.0f, 3.81f)
                lineToRelative(0.38f, 0.4f)
                lineToRelative(-0.4f, 0.4f)
                arcToRelative(2.7f, 2.7f, 0.0f, false, false, 0.0f, 3.82f)
                curveTo(4.85f, 17.27f, 6.64f, 17.33f, 8.0f, 16.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(16.0f, 16.0f)
                curveToRelative(1.36f, 1.33f, 3.15f, 1.27f, 4.2f, 0.2f)
                arcToRelative(2.7f, 2.7f, 0.0f, false, false, 0.0f, -3.81f)
                lineToRelative(-0.38f, -0.4f)
                lineToRelative(0.4f, -0.4f)
                arcToRelative(2.7f, 2.7f, 0.0f, false, false, 0.0f, -3.82f)
                curveTo(19.15f, 6.73f, 17.36f, 6.67f, 16.0f, 8.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.8f, 20.2f)
                arcToRelative(2.7f, 2.7f, 0.0f, false, false, 3.81f, 0.0f)
                lineToRelative(0.4f, -0.38f)
                lineToRelative(0.4f, 0.4f)
                arcToRelative(2.7f, 2.7f, 0.0f, false, false, 3.82f, 0.0f)
                curveToRelative(1.06f, -1.06f, 1.12f, -2.85f, -0.21f, -4.21f)
                lineToRelative(-4.0f, -4.0f)
                lineToRelative(-4.0f, 4.0f)
                curveToRelative(-1.33f, 1.36f, -1.27f, 3.15f, -0.2f, 4.2f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(7.0f, 17.0f)
                lineToRelative(-5.0f, 5.0f)
            }
        }
        .build()
        return _clover!!
    }

private var _clover: ImageVector? = null
