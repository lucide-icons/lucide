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

public val Lucide.LassoSelect: ImageVector
    get() {
        if (_lassoSelect != null) {
            return _lassoSelect!!
        }
        _lassoSelect = Builder(name = "LassoSelect", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.0f, 22.0f)
                arcToRelative(5.0f, 5.0f, 0.0f, false, true, -2.0f, -4.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.0f, 16.93f)
                curveToRelative(0.96f, 0.43f, 1.96f, 0.74f, 2.99f, 0.91f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(3.34f, 14.0f)
                arcTo(6.8f, 6.8f, 0.0f, false, true, 2.0f, 10.0f)
                curveToRelative(0.0f, -4.42f, 4.48f, -8.0f, 10.0f, -8.0f)
                reflectiveCurveToRelative(10.0f, 3.58f, 10.0f, 8.0f)
                arcToRelative(7.19f, 7.19f, 0.0f, false, true, -0.33f, 2.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(5.0f, 18.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, true, false, 0.0f, -4.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 0.0f, 4.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(14.33f, 22.0f)
                horizontalLineToRelative(-0.09f)
                arcToRelative(0.35f, 0.35f, 0.0f, false, true, -0.24f, -0.32f)
                verticalLineToRelative(-10.0f)
                arcToRelative(0.34f, 0.34f, 0.0f, false, true, 0.33f, -0.34f)
                curveToRelative(0.08f, 0.0f, 0.15f, 0.03f, 0.21f, 0.08f)
                lineToRelative(7.34f, 6.0f)
                arcToRelative(0.33f, 0.33f, 0.0f, false, true, -0.21f, 0.59f)
                horizontalLineToRelative(-4.49f)
                lineToRelative(-2.57f, 3.85f)
                arcToRelative(0.35f, 0.35f, 0.0f, false, true, -0.28f, 0.14f)
                verticalLineToRelative(0.0f)
                close()
            }
        }
        .build()
        return _lassoSelect!!
    }

private var _lassoSelect: ImageVector? = null
