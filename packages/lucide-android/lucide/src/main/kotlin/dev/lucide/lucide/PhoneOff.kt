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

public val Lucide.PhoneOff: ImageVector
    get() {
        if (_phoneOff != null) {
            return _phoneOff!!
        }
        _phoneOff = Builder(name = "PhoneOff", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(10.68f, 13.31f)
                arcToRelative(16.0f, 16.0f, 0.0f, false, false, 3.41f, 2.6f)
                lineToRelative(1.27f, -1.27f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 2.11f, -0.45f)
                arcToRelative(12.84f, 12.84f, 0.0f, false, false, 2.81f, 0.7f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 1.72f, 2.0f)
                verticalLineToRelative(3.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -2.18f, 2.0f)
                arcToRelative(19.79f, 19.79f, 0.0f, false, true, -8.63f, -3.07f)
                arcToRelative(19.42f, 19.42f, 0.0f, false, true, -3.33f, -2.67f)
                moveToRelative(-2.67f, -3.34f)
                arcToRelative(19.79f, 19.79f, 0.0f, false, true, -3.07f, -8.63f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 4.11f, 2.0f)
                horizontalLineToRelative(3.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 2.0f, 1.72f)
                arcToRelative(12.84f, 12.84f, 0.0f, false, false, 0.7f, 2.81f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -0.45f, 2.11f)
                lineTo(8.09f, 9.91f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(22.0f, 2.0f)
                lineTo(2.0f, 22.0f)
            }
        }
        .build()
        return _phoneOff!!
    }

private var _phoneOff: ImageVector? = null
